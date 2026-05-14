You are a senior frontend architect and UI engineer.

I want you to transform my rough portfolio project idea into a production-ready implementation specification for a coding agent.

Your task is NOT to directly code first.
Your task is to:

1. Refine the architecture
2. Fill missing technical decisions
3. Improve UX consistency
4. Keep the original artistic direction
5. Produce highly actionable markdown documentation

The stack:

- SvelteKit
- TailwindCSS
- Static generation only
- Deploy target: GitHub Pages
- No backend
- Mobile-first responsive design
- Animations using:
  - svelte-inview
  - svelte-motion
- Avoid heavy libraries
- No WebGL / Three.js

The portfolio owner:

- Software engineer / web developer
- 2+ years experience

========================================
DESIGN DIRECTION
========================================

Theme:

- Earth forest aesthetic
- Modern technological touch
- Minimalistic but expressive
- Elegant developer portfolio
- Atmospheric but professional

Color palette:

- Deep forest green: #15291E
- Warm cream: #FFFBDD
- Muted antique gold: #B08D57

Color usage:

- Alternate section foreground/background combinations
- Example:
  - Section A → dark background + light text
  - Section B → light background + dark text
- Use gold as accent only
- Maintain accessibility contrast

Visual style:

- Clean typography
- Slightly futuristic
- Organic + technological balance
- Soft shadows
- Smooth transitions
- Motion should feel premium and subtle
- Avoid excessive animation

========================================
TECHNICAL REQUIREMENTS
========================================

Framework:

- SvelteKit latest stable
- TypeScript preferred
- TailwindCSS for styling

Deployment:

- Must support static adapter
- Must work on GitHub Pages

Performance:

- Fast first load
- Minimal dependencies
- Lighthouse friendly
- Mobile optimized

Accessibility:

- Semantic HTML
- Keyboard navigable
- Proper aria labels
- Reduced motion support

========================================
APP STRUCTURE
========================================

Pages:

1. Homepage
2. Custom 404 page

Homepage sections:

1. Hero
2. About Me
3. Career
4. Contact

========================================
SIDEBAR NAVIGATION
========================================

There is NO traditional top navbar.

Instead:

- Fixed left sidebar
- Minimalistic design
- Vertically centered icons
- Sidebar background must contrast slightly with current section
- Smooth hover transitions

Navigation items:

- Home icon → root path "/"
- User icon → About section
- Work icon → Career section
- Mail icon → Contact section

Behavior:

- Smooth scrolling
- Active section indication
- Hover color animation
- Mobile responsive adaptation required

========================================
HERO SECTION
========================================

Layout:

- Two-column layout on desktop
- Stacked layout on mobile

LEFT SIDE:
Developer-inspired typography composition.

Top-right:

- italic "<html>"
- below it italic "<body>"

Main content:

<h1>
Hi, I'm Dimas, software developer.
</h1>

Below:
Front End Developer / Back End Developer

CTA button:

- "CONTACT ME"
- Scrolls to contact section

Bottom-left:

- closing "</body>"
- closing "</html>"

RIGHT SIDE:

- Very large "D" character
- 3D-ish appearance
- Floating feel
- Shadow depth
- Slight transform rotation interaction
- Mouse/parallax interaction allowed
- No heavy 3D libraries

========================================
ABOUT SECTION
========================================

Contains:

- Profile photo
- Introductory paragraph

Content focus:

- Who I am
- What I do
- Technologies/tools commonly used
- Personal but professional tone

Animation:

- Subtle fade/slide on scroll

========================================
CAREER SECTION
========================================

Timeline layout:

- Latest to oldest
- Vertical center separator line
- Two-column structure

LEFT:

- Month and year

CENTER:

- Timeline line
- Circle indicator aligned with each entry

RIGHT:

- Job position @ company/worksite
- Brief summary

Interaction:

- Hovering job title shows popover/card
- Popover contains detailed responsibilities/achievements
- Smooth animation
- Mobile timeline adaptation required

========================================
CONTACT SECTION
========================================

Contains:

- Contact methods only
- No form

Include:

- LinkedIn
- Instagram
- GitHub
- Email address
- Download/View CV button

CV button:

- Direct Google Drive link

Interactions:

- Hover states
- External link indicators optional

========================================
LOADING SCREEN
========================================

Before homepage renders:

- Fullscreen loading screen

Bottom-left:

- "loading" text
- Animated dots

Bottom-right:

- Percentage counter from 0–100

When complete:

- Loading screen slides upward
- Homepage revealed smoothly

Requirements:

- Lightweight implementation
- No fake long loading
- Smooth transition timing

========================================
ANIMATION REQUIREMENTS
========================================

Use animation carefully.

Requirements:

- Text reveal on scroll
- Fade/slide transitions
- Smooth section appearance
- Subtle hover interactions
- Motion should feel polished and modern

Avoid:

- Excessive motion
- Overly flashy effects
- Heavy GPU usage

========================================
WHAT I WANT FROM YOU
========================================

Generate these markdown documents:

1. PROJECT_OVERVIEW.md

- High-level project description
- Goals
- UX direction
- Visual philosophy

2. TECH_STACK.md

- Dependencies
- Why each dependency is used
- SSG configuration
- GitHub Pages deployment notes

3. ARCHITECTURE.md

- Folder structure
- Component structure
- Shared UI strategy
- State management decisions
- Animation strategy

4. DESIGN_SYSTEM.md

- Typography system
- Color system
- Spacing
- Responsive breakpoints
- Motion principles
- Reusable UI patterns

5. IMPLEMENTATION_PLAN.md

- Step-by-step execution order
- Milestones
- Build priority
- Dependency ordering

6. COMPONENT_BREAKDOWN.md

- Every component required
- Responsibilities
- Props
- Reusability notes

7. ANIMATION_SPEC.md

- Detailed animation behaviors
- Timing recommendations
- Trigger conditions
- Reduced motion handling

8. AGENT_RULES.md

- Coding conventions
- Performance rules
- Accessibility rules
- Styling constraints
- Animation limitations
- Clean code expectations

9. TASK_CHECKLIST.md

- Atomic implementation tasks
- Checkboxes
- Acceptance criteria per task

10. DEPLOYMENT.md

- GitHub Pages setup
- Static adapter config
- Build/deploy steps

Important:

- Be extremely specific
- Avoid vague tasks
- Make this executable by a coding agent
- Fill architectural gaps intelligently
- Preserve the intended artistic direction
- Prefer maintainability and performance
- Use modern SvelteKit best practices
