package com.esprit.velo.Controller;

import com.esprit.velo.Entity.Notification;
import com.esprit.velo.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/unread")
    public List<Notification> getUnreadNotifications() {
        return notificationService.getUnread();
    }

    @PostMapping("/{id}/read")
    public void markNotificationAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }
}

