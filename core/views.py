from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.core.cache import cache
from django.core.exceptions import ValidationError
from functools import wraps
from .forms import ContactForm

# Create your views here.
def home(request):
    return render(request, 'core/html/home.html')

def products(request):
    return render(request, 'core/html/products.html')

def ratelimit(timeout=60*15, max_requests=3):  # 15 minutes, 3 requests
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if request.method == 'POST':
                # Get client IP
                ip = request.META.get('REMOTE_ADDR')
                # Create a cache key for this IP
                cache_key = f'contact_form_{ip}'
                # Get current requests count for this IP
                requests = cache.get(cache_key, 0)

                # Check if limit is exceeded
                if requests >= max_requests:
                    messages.error(
                        request,
                        f"Too many messages. Please try again after {timeout//60} minutes."
                    )
                    return redirect('contact')

                # Increment the requests counter
                cache.set(cache_key, requests + 1, timeout)

            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator

@ratelimit()  # Add the decorator to the contact view
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            try:
                name = form.cleaned_data['name']
                email = form.cleaned_data['email']
                message = form.cleaned_data['message']
                
                email_subject = f'New Contact Form Submission from {name}'
                email_message = f'Name: {name}\nEmail: {email}\nMessage:\n{message}'
                
                send_mail(
                    subject=email_subject,
                    message=email_message,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )
                messages.success(request, "Your message has been sent successfully!")
            except Exception as e:
                messages.error(request, "There was an error sending your message. Please try again later.")
            
            return redirect('contact')
    else:
        form = ContactForm()
    return render(request, 'core/html/contact.html', {'form': form})

def aboutus(request):
    return render(request,'core/html/aboutus.html')

def mystat(request):
    return render(request,'core/html/mystat.html')

def mycerebro(request):
    return render(request,'core/html/mycerebro.html')