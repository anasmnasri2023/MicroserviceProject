package com.example.RentaBike_Event_Comment_MS.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.RentaBike_Event_Comment_MS.models.Event;
import com.example.RentaBike_Event_Comment_MS.repository.EventRepository;

@Service
public class EventServiceImpl implements EventService{
	
	@Autowired
	EventRepository eventRepository;

	@Override
	public List<Event> retrieveAllEvents() {
		List<Event> events = (List<Event>) eventRepository.findAll();
		return events;
	}

	@Override
	public Event addEvent(Event e) {
		return eventRepository.save(e);
	}

	@Override
	public void deleteEvent(Long id) throws NoSuchElementException{
		eventRepository.deleteById(id);
	}

	@Override
	public Event updateEvent(Event p) {
		return eventRepository.save(p);
	}

	@Override
	public Event retrieveEvent(Long id) throws NoSuchElementException{
		Event e = eventRepository.findById(id)
				.orElseThrow(() -> new NoSuchElementException("Event not found for this id :: " + id));
		return e;
	}

}
