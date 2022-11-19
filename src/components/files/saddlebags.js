const bisacce = 'object(a,10,10).\nobject(b,10,5).\n\nobject(c,10,5).\ncapacity(12).\n%FACCIO IL GUESS\nin(O) | out(O) :- object(O,V,W).\n%faccio il controllo che la somma degli oggetti che metto\n%non superi la capacity\n%per considerare anche i duplicati faccio W,O\n:- #sum{W,O:object(O,_,W),in(O)} > X , capacity(X).';

export default bisacce;

