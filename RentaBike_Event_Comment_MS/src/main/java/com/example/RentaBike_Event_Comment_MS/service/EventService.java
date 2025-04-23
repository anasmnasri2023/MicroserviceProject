package com.example.RentaBike_Event_Comment_MS.service;

import java.util.List;

import com.example.RentaBike_Event_Comment_MS.models.Event;

public interface EventService {
	
	List<Event> retrieveAllEvents();

	Event addEvent(Event e);

	void deleteEvent(Long id);

	Event updateEvent(Event p);

	Event retrieveEvent(Long id);
	
}
