% Choice and constraint: build a small menu.

main(pasta; pizza; salad).
drink(water; cola; wine).

% choose exactly one main course and one drink
1 { choose_main(M) : main(M) } 1.
1 { choose_drink(D) : drink(D) } 1.

% forbid unhealthy combination (just for fun)
:- choose_main(pizza), choose_drink(cola).
