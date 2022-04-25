from django.shortcuts import render
from django.db.models import Q
from .models import *


# Create your views here.

def IndexView(request, *args, **kwargs):
    return render(request, 'index.html')

# utilizing the search func using Q
def SearchView(request, *args, **kwargs):
    query = request.GET.get('q', None)

    if query is not None:
        results = InstagramAccount.objects.filter(Q(username__icontains=query))

    context = {
        'results':results
    }
    return render(request, 'search-results.html', context)
