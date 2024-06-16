from django.views.generic import TemplateView
from django.utils.safestring import mark_safe
import json


# Marksafe vai remover algo malicioso, 
# o que eu entendi, se usuario manda o nome da sala, 
# mas o nome da sala é um script malcioso, o mark_Safe remove 

class IndexView(TemplateView):
    template_name = 'index.html'

# vai usa template sala e vai manda json com o nome da sala
class SalaView(TemplateView):
    template_name = 'sala.html'

    def get_context_data(self, **kwargs):
        context = super(SalaView, self).get_context_data(**kwargs)
        context['nome_sala_json'] = mark_safe(
            json.dumps(self.kwargs['nome_sala'])
        )
        return context
