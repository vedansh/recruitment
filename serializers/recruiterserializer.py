from serializers.dynamicfieldmodelserializer import DynamicFieldsModelSerializer
from myapp.models import Recruiter

class RecruiterSerializer(DynamicFieldsModelSerializer):
#class UsersSerializer(serializers.ModelSerializer):
    """
    Serializing all the Users
    """
    class Meta:
        model = Recruiter
        fields = (
            'email',
            'name',
			'id',
        )