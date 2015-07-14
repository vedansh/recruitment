from rest_framework import viewsets

from serializers import RecruiterSerializer
from myapp.models import Recruiter

'''
{
    "email": "a@b.com",
    "password": "XXXXXXXX",
    "name": "yy"
}
'''

# candidate_lib = RecruiterLib()

class RecruiterView(viewsets.ModelViewSet):

	serializer_class = RecruiterSerializer
	queryset = Recruiter.objects.all()