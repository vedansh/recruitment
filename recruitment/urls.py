from django.conf.urls import patterns, include, url
from rest_framework import routers
import views

r = routers.DefaultRouter()
r.register(r'candidate', views.CandidateView)
r.register(r'recruiter', views.RecruiterView)

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'candidate', views.CandidateView)
router.register(r'recruiter', views.RecruiterView)

urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'^', include(r.urls)),
)
