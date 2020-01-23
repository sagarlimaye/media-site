package com.mediasite.api.model;
import com.mongodb.*;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.Date;
import org.springframework.data.annotation.Id;

public class News {
	@Id
    private String _id;
    private String title;
    private String description;
    private String story;
    private Date published;


	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStory() {
		return story;
	}
	public void setStory(String story) {
		this.story = story;
	}
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Date getPublished() {
		return published;
	}
	public void setPublished(String pub) {
		DateTimeFormatter df = DateTimeFormatter.ISO_DATE_TIME;
		TemporalAccessor accessor = df.parse(pub);
		Date date = Date.from(Instant.from(accessor));

		this.published = date;
	}
	public void setPublished(Date published) {
		this.published = published;
	}
    
}