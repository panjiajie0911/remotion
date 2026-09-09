# Source structure

- `components/animation`: Timeline-driven animation wrappers.
- `components/text`: Reusable typography and title treatments.
- `components/ui`: Small visual building blocks such as badges and progress bars.
- `components/media`: Reusable image, video, and audio wrappers belong here.
- `scenes`: Scene-level assemblies made from reusable components.
- `compositions`: Full video timelines belong here as the project grows.
- `lib`: Theme tokens, timing helpers, and other shared utilities.
- `episodes/episode-XX`: Per-episode scripts, assets, scenes, and timeline entry.

Export reusable components from `components/index.ts`. Keep composition registration in `Root.tsx` and use scene files to assemble reusable components into complete sections.
