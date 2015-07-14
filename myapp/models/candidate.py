import uuid

from django.db import models

from myapp.models.recruiter import Recruiter


class CandidateManager(models.Manager):
	def generate_id(self):
		return str(uuid.uuid4())

class Candidate(models.Model):
	name = models.CharField(max_length=50)
	email = models.CharField(max_length=50, unique=True)
	password = models.CharField(max_length=50)
	id = models.CharField(max_length=64, primary_key=True, editable=False)
	recruiter = models.ForeignKey(Recruiter, blank=True, null=True, on_delete=models.SET_NULL)

	ts_created = models.DateTimeField(auto_now_add=True)
	ts_updated = models.DateTimeField(auto_now=True)
	objects = CandidateManager()

	def save(self, *args, **kwargs):
		if not self.id:
			self.id = Candidate.objects.generate_id()
		return super(Candidate, self).save(*args, **kwargs)

	def __unicode__(self):
		return self.name

	class Meta:
		db_table = 'candidate'
		app_label = 'myapp'