const battagliaNavale = '%Gioco battaglia navale\n%gioco battaglia navale\n%abbiamo 5 navi\n%tutte le navi occupano tre caselle\nship(1).\nship(2).\nship(3).\nship(4).\nship(5).\n%definisco il campo da battaglia riga(1..6).\ncoords(X,Y) :- riga(X),riga(Y).\n%una nava puo occupare una cella oppure no\nship_at(S,X,Y) | -ship_at(S,X,Y) :- ship(S) , coords(X,Y).\n%due navi differenti non possono occupare la stessa posizione\n:- ship_at(S1,X,Y) , -ship_at(S2,X,Y) , S1 != S2.\n%ogni nave deve occupare esattamente tre posizioni\n:- ship(S) , not #count{X,Y:ship_at(S,X,Y) } = 3.\n%una nave non puo occupare due posizioni tali da essere differenti\n%sia in riga che in colonna.\n:- ship_at(S,X1,Y1) , ship_at(S,X2,Y2) , X1 != X2 , Y1 != Y2.';

export default battagliaNavale;
