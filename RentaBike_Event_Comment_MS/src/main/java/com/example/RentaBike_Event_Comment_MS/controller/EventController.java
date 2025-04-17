package com.example.RentaBike_Event_Comment_MS.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.RentaBike_Event_Comment_MS.models.Event;
import com.example.RentaBike_Event_Comment_MS.service.EventServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@RestController
@Api(tags = "Events management")
@RequestMapping("/event")
public class EventController {
	
	@Autowired
	EventServiceImpl es ;
	
	 @GetMapping("/display")
	 @ApiOperation(value = "Get the event list")
	public List<Event> retrieveAllEventsC() {
		List<Event> events = es.retrieveAllEvents();
		return events ;	
	}
	 
	@PostMapping("/add")
	@ApiOperation(value = "Add an event")
	public Event addEventC(@RequestBody Event e) {
		Event e1 = es.addEvent(e);
		return e1;
	}
	
	@DeleteMapping("/delete/{idEvent}")
	@ApiOperation(value = "Delete an event")
	public void deleteEventC(@PathVariable(value = "idEvent") Long idEvent) throws NoSuchElementException {
		es.deleteEvent(idEvent);
	}
	
	@PutMapping("/update")
	@ApiOperation(value = "Edit an event")
	public Event updateEventC(@Validated @RequestBody Event e) {
		Event e1 = es.updateEvent(e);
		return e1;
	}
	
	@GetMapping("/retrive/{id}")
	@ApiOperation(value = "Get event by id")
	public Event retrieveEventC(@PathVariable(value = "id") Long id) throws NoSuchElementException{
		Event e = es.retrieveEvent(id);
		return e ;
	}
	 
}
