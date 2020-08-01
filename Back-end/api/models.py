from django.db import models
import datetime
from django.utils.timezone import localdate


STATUS = [  ('NEW', 'New'),
            ('IN-PROGRESS', 'In progress'),
            ('COMPLETED', 'Completed'),
        ]

LABEL = [  ('PERSONAL', 'Personal'), 
            ('WORK','Work'), 
            ('SHOPPING',"Shopping"),
            ('OTHERS',"Others") ]

class Tasks(models.Model):
    task_content = models.CharField(max_length=100)
    status = models.CharField(choices=STATUS, default='NEW', max_length=100)
    label = models.CharField(choices=LABEL, default='PERSONAL', max_length=100)
    date_added = models.DateField(default = localdate())
    due_date = models.DateField(default = localdate())

    owner = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    class Meta:
        ordering = ['due_date']

    def __str__(self):
        return self.task_content

