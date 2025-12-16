% Family: ancestor relation

parent(john, mary).
parent(mary, alice).
parent(alice, bob).

ancestor(X,Y) :- parent(X,Y).
ancestor(X,Y) :- parent(X,Z), ancestor(Z,Y).

% The solver will compute all ancestor/2 atoms.
