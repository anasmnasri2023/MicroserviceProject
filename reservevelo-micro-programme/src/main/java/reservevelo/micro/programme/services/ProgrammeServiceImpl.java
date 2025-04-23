package reservevelo.micro.programme.services;

import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestTemplate;
import reservevelo.micro.programme.models.Programme;
import reservevelo.micro.programme.repos.ProgrammeRepo;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProgrammeServiceImpl implements IProgrammeService {
	
	@Autowired
	ProgrammeRepo programmeBaladeRepo;
	
	@Override
	public List<Programme> getAllProgrammes() {
		return programmeBaladeRepo.findAll();
	}

	@Override
	public Programme getProgrammeById(String id ) {
		return programmeBaladeRepo.findById(id).get();
	}

	@Override
	public Programme addProgramme(Programme programme) {
		return programmeBaladeRepo.save(programme);
	}

	@Override
	public Programme updateProgramme(Programme programmeBalade) {
		return programmeBaladeRepo.save(programmeBalade);
	}

	@Override
	public void deleteProgramme(String id) {
		programmeBaladeRepo.deleteById(id);
	}

	// Add this method to your existing ProgrammeService

	public Programme fetchWeatherForProgramme(Programme programme) {
		try {
			String city = programme.getStartingPoint();
			String apiKey = "376527f64bec1aa8137ced3e935d6acd";
			String url = String.format(
					"https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric",
					city, apiKey);

			RestTemplate restTemplate = new RestTemplate();
			Map<String, Object> response = restTemplate.getForObject(url, Map.class);

			Map<String, Object> main = (Map<String, Object>) response.get("main");
			List<Map<String, Object>> weatherArray = (List<Map<String, Object>>) response.get("weather");
			Map<String, Object> weather = weatherArray.get(0);

			programme.setWeatherCondition((String) weather.get("description"));
			programme.setTemperature(((Number) main.get("temp")).doubleValue());
			programme.setWeatherIcon((String) weather.get("icon"));

			return programmeBaladeRepo.save(programme);

		} catch (Exception e) {
			log.error("Error fetching weather: {}", e.getMessage());
			return programme;
		}
	}


}