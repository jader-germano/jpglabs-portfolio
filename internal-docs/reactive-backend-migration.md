# Next Backend Lane + Java Quarkus Replica

## Intent

This note records the architectural decision to keep the current Next backend/BFF
lane active, evolve it for business-scale traffic, and prepare a separate Java +
Quarkus replica only in the final post-deploy epic.

## Decisions

- Next.js remains the active backend/BFF lane for the current delivery track.
- A new Java API repository will be created for the Quarkus implementation.
- The Java + Quarkus service is intended to replicate the Next backend contract and operate as a parallel service behind the same load balancer only after the VPS deployment is stable.
- Both services should be maintained as showcase implementations of the same API contract when the replica track starts.

## Next Backend Lane

The Next backend lane should absorb the immediate scaling work through explicit
business-scale patterns:

- stateless web nodes and externalized state
- non-blocking I/O and async boundary cleanup
- queue-driven processing for long-running or bursty workloads
- idempotent job handling and retry-safe consumers
- rate limiting, load shedding and backpressure-aware integration points
- observability for latency, concurrency, queue depth and error saturation
- Supabase contracts documented deeply enough for later replica parity

## Java + Quarkus Lane

The Java replica should be developed in a separate repository with explicit ADR coverage:

- latest Java LTS and latest stable Quarkus stream validated at implementation time
- same API contract and payload semantics as the Next backend lane
- compatibility with the shared load balancer strategy
- contract-test and parity-test coverage against the Next lane

## Migration Path

1. Stabilize the current Next backend lane and document its async/runtime boundaries.
2. Extract the canonical API contract and the Supabase boundary that both services must implement.
3. Deploy and stabilize the Next lane on the VPS.
4. Open the new Java repository and register ADRs for ownership, parity and routing.
5. Implement the Quarkus replica against the same contract.
6. Introduce the Java service behind the load balancer with controlled traffic and parity validation.

## Operational Rule

Backend changes should be tracked as contract-first work. When the replica track
starts, the Next and Java + Quarkus lanes must both receive the accepted
capability updates so the pair remains synchronized as a production-ready
showcase.
