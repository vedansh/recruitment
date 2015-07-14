from rest_framework import viewsets

from serializers import CandidateSerializer
from myapp.models import Candidate

'''
{
    "email": "a@b.com",
    "password": "XXXXXXXX",
    "name": "yy"
}
'''

class CandidateView(viewsets.ModelViewSet):

	serializer_class = CandidateSerializer
	queryset = Candidate.objects.all()
