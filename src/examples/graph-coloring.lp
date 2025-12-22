% Graph 3-coloring of a triangle

node(a). node(b). node(c).
edge(a,b). edge(b,c). edge(c,a).

color(red;green;blue).

% each node has exactly one color
1 { col(N,C) : color(C) } 1 :- node(N).

% adjacent nodes cannot share the same color
:- edge(X,Y), col(X,C), col(Y,C).
