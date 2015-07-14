from serializers.dynamicfieldmodelserializer import DynamicFieldsModelSerializer
from myapp.models import Candidate

class CandidateSerializer(DynamicFieldsModelSerializer):
#class UsersSerializer(serializers.ModelSerializer):
    """
    Serializing all the Users
    """
    class Meta:
        model = Candidate
        fields = (
            'email',
            'name',
			'id',
			'recruiter',
        )