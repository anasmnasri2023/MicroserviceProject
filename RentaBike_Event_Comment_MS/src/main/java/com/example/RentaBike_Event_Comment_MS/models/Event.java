package com.example.RentaBike_Event_Comment_MS.models;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(description = "Event")
public class Event implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idEvent")
	@ApiModelProperty(value = "idEvent")
	private Long idEvent;
	@Column(name = "title")
	@ApiModelProperty(value = "title")
	private String title;
	@Column(name = "description")
	@ApiModelProperty(value = "description")
	private String description;
	@Column(name = "location")
	@ApiModelProperty(value = "location")
	private String location;
	@Column(name = "start_date")
	@Temporal(TemporalType.DATE)
	@ApiModelProperty(value = "start_date")
	private Date start_date;
	@Column(name = "end_date")
	@Temporal(TemporalType.DATE)
	@ApiModelProperty(value = "end_date")
	private Date end_date;
	private String picture;
}
