package com.example.RentaBike_Event_Comment_MS.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.RentaBike_Event_Comment_MS.models.Event;

@Repository
public interface EventRepository extends CrudRepository<Event, Long>{

}
