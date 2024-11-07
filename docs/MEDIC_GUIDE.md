## Field Guide: TonyAI Brain System

### SCENE ASSESSMENT (System Overview)
- Primary brain functions (like primary survey)
- Secondary cognitive processes (like secondary survey)
- Ongoing monitoring (like vitals)

### TRIAGE LEVELS (System States)
1. **FULL** (Green)
   - All systems go
   - Full cognitive function
   - Maximum memory capacity

2. **CONSTRAINED** (Yellow)
   - Limited resources
   - Core functions only
   - Like running a code with minimal equipment

3. **OFFLINE** (Red)
   - Emergency protocols active
   - Local operations only
   - Think: battlefield medicine, minimal resources

4. **FALLBACK** (Black)
   - Critical systems only
   - Basic functionality
   - Emergency protocols

### PROTOCOLS (Like Medical Protocols)

1. **Memory System** (Like Patient History)
   - Stores experiences
   - Maintains context
   - Tracks patterns
   ```typescript
   // Think of it like writing a PCR
   memorySystem.store({
     id: 'incident-001',
     type: 'episodic',
     context: 'scene details'
   });
   ```

2. **Cognitive Processing** (Like Treatment Protocols)
   - 7 types of thinking (like BLS vs ALS protocols)
   - Each serves specific purpose
   - Adapts based on situation

3. **Self-Evaluation** (Like Quality Improvement)
   - Monitors performance
   - Identifies improvements
   - Adapts protocols

### CRITICAL NOTES

1. **Resource Management** (Like Supply Management)
   - System auto-scales based on available resources
   - Maintains core functions under stress
   - Has backup protocols

2. **Integration Points** (Like Hospital Handoff)
   - Convex: Main database (like hospital records)
   - Mapbox: Spatial awareness (like scene mapping)
   - HuggingFace: Pattern recognition (like diagnostic tools)

### DEPLOYMENT CHECKLIST (Like Rig Check)

1. Environment Variables (Like Equipment Check)
   ```env
   NEXT_PUBLIC_CONVEX_URL=xxx
   NEXT_PUBLIC_MAPBOX_TOKEN=xxx
   NEXT_PUBLIC_HUGGINGFACE_KEY=xxx
   ```

2. System Health (Like Unit Status)
   - Check resources
   - Verify connections
   - Test responses

### TROUBLESHOOTING (Like Field Problem-Solving)

If system degrades:
1. Check resources (like checking vitals)
2. Verify connections (like checking equipment)
3. Fall back to basic operations if needed (like BLS protocols)

Remember: Like in EMS, the system is designed to be resilient and adapt to conditions. It'll automatically triage its own functions based on available resources - just like you'd triage patients in an MCI.