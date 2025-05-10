package com.esprit.velo.Service;

import com.esprit.velo.Entity.Notification;
import com.esprit.velo.Repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class NotificationService {
    @Autowired
    private NotificationRepository repo;

    public void notify(String message) {
        Notification notification = new Notification();
        notification.setMessage(message);
        repo.save(notification);
    }

    public List<Notification> getUnread() {
        return repo.findByReadFalse();
    }

    public void markAsRead(Long id) {
        Notification n = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found with id " + id));
        n.setRead(true);
        repo.save(n);
    }
}
