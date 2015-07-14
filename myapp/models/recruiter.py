import uuid

from django.db import models

class RecruiterManager(models.Manager):
	def generate_id(self):
		return str(uuid.uuid4())

class Recruiter(models.Model):
	name = models.CharField(max_length=50)
	email = models.CharField(max_length=50, unique=True)
	password = models.CharField(max_length=50)
	id = models.CharField(max_length=64, primary_key=True, editable=False)

	ts_created = models.DateTimeField(auto_now_add=True)
	ts_updated = models.DateTimeField(auto_now=True)
	objects = RecruiterManager()

	def save(self, *args, **kwargs):
		if not self.id:
			self.id = Recruiter.objects.generate_id()
		return super(Recruiter, self).save(*args, **kwargs)

	def __unicode__(self):
		return self.name

	class Meta:
		db_table = 'recruiter'
		app_label = 'myapp'