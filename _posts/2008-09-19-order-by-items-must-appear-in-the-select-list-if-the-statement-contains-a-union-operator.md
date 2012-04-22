---
title: ORDER BY items must appear in the select list if the statement contains a UNION operator
layout: post
date: 2008-08-19
type: regular
---

Is a very annoying error message that you get when writing above average complexity `SELECT` statements. I’m not sure if it only applies to queries against SQL Server, but it can be very difficult to debug if you haven’t come across it before (or come across so many things in a day that they all blur into one big problem).

For me at least it happens like this:

1. Ben writes a big meaty query, tests it, all ok
2. Ben writes query #2, which has the same SELECTed columns as the first query, tests also, also ok
3. Ben sticks a `UNION ALL` between the two queries, thus making Das Uberquery&trade; and securing his employment
4. Ben executes said query and gets cryptic error message, spends rest of day tring to debug 300 lines of SQL, goes home with migraine.

It sounds like one of the queries has an `ORDER BY` clause but of course I’ve taken all of the `ORDER BY`s out when joining them, and I’m ordering the UNION as a whole!

The issue is that one or more of the big mutha queries that are being UNION ALLed together contain a subquery that contains a `ORDER BY` clause. Something like this:

    SELECT t1.A, t2.B
    FROM t1, (SELECT TOP 1 * FROM Foo ORDER BY Bar) t2
    UNION ALL
    SELECT t3.A, t3.B
    FROM t3

It’s that `ORDER BY Bar` part that gives grief. I can’t see why it’s an issue, but this is what to look out for. Replace the subquery with a view or find some other way to do it without the `ORDER BY` clause.

