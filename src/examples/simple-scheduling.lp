% Simple scheduling: choose a start time (0..2) for each task on a single machine.

task(t1; t2; t3).
time(0..2).

% each task starts at exactly one time
1 { start(T,Time) : time(Time) } 1 :- task(T).

% duration of each task
dur(t1,2). dur(t2,1). dur(t3,1).

% a task occupies consecutive time slots from Start to Start+Dur-1
uses(T,Slot) :- start(T,Start), dur(T,D), Slot = Start..Start+D-1.

% no two different tasks can use the machine at the same time slot
:- uses(T1,Slot), uses(T2,Slot), T1 != T2.
