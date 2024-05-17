from django.urls import path
from patient import views
from .views import payment

app_name = "patient"

urlpatterns = [
    path('list', views.ListPatient.as_view()),
    path('details/<int:id>', views.PatientDetils.as_view()),
    path('add-patient', views.AddPatient.as_view()),
    path('appointment/<int:id>', views.BookAppointment.as_view()),
    path('payment/<int:id>', views.payment)  
]