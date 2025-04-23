package com.example.RentaBike_Event_Comment_MS.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
@Table(name = "Comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ApiModel(description = "Comment")
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idComment")
	@ApiModelProperty(value = "idComment")
	private Long idComment;
	@Column(name = "content")
	@ApiModelProperty(value = "content")
	private String content;
	@Column(name = "date")
	@Temporal(TemporalType.DATE)
	@ApiModelProperty(value = "date")
	private Date date;
	
	@JsonIgnore
	@ManyToOne
	@ToString.Exclude
	Event event;
}
