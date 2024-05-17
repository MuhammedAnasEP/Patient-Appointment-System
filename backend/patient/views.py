from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from .models import Patient, Appointment
from .serializers import PatientSerializer, AppointmentSerializer
from rest_framework.permissions import IsAuthenticated
import stripe
from django.conf import settings

# stripe.api_key = settings.API_KEY

# Create your views here.

class ListPatient(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    filter_backends = (SearchFilter,)
    search_fields = ['name']


class AddPatient(APIView):
    
    def post(self, request):
        serializer = PatientSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = request.data['name']
        email = request.data['email']
        phone = request.data['phone']
        diseas = request.data['diseas']

        # Checking the patient is exist or not
        patient = Patient.objects.filter(Q(email=email) | Q(phone=phone))
        if patient:
            content = {"details":"Patient with this email and phone number already exist."}
            return Response(content, status=status.HTTP_409_CONFLICT)
        
        try:
            patient = Patient.objects.create(name = name, email = email, phone = phone, diseas=diseas)
            patient.save()
        except:
            content = {"Details":"Not able to add these data, check the details and try again."}
            return Response(content, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        return Response(serializer.data)

class PatientDetils(APIView):

    def get(self, request, id):
        
        try:
            patient = Patient.objects.get(id=id)
        except:
            content = {"details":"Not able to get the details"}
            return Response(content, status=status.HTTP_204_NO_CONTENT)
        serializer = PatientSerializer(patient, many=False)
        return Response(serializer.data)


class BookAppointment(APIView):

    def post(self, request, id):
        user = request.user
        serilizer = AppointmentSerializer(data=request.data)
        serilizer.is_valid(raise_exception=True)

        date = request.data['date']
        time = request.data['time']

        patient = Patient.objects.get(id=id)
        appontment = Appointment.objects.create(user = user.id, patient = patient.id, date=date, time=time, )

        return Response(serilizer.data)


@api_view(['POST'])
def payment(request, id):
    patient = Patient.objects.get(id = id)
    test_payment_intent = stripe.PaymentIntent.create(
    amount=1000, currency='pln', 
    payment_method_types=['card'],
    receipt_email=patient.email)
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)