import { Basic } from "../components/reader/Basic";
import { Formats } from "../components/reader/Formats";
import { CustomThemes } from "../components/reader/CustomThemes";
import { InitialLocation } from "../components/reader/InitialLocation";
import { Search } from "../components/reader/Search";
import { OpenExternalLink } from "../components/reader/OpenExternalLink";
import { Annotations } from "../components/reader/Annotations";
import { Bookmarks } from "../components/reader/Bookmarks";
import { FullExample } from "../components/reader/FullExample";
import TableOfContents from "../components/reader/TableOfContents";
import { JavascriptInjection } from "../components/reader/JavascriptInjection";
import { Spreads } from "../components/reader/Spreads";
import { ScrolledDoc } from "../components/reader/ScrolledDoc";
import { ContinuousSpreads } from "../components/reader/ContinuousSpreads";
import { ContinuousScrolled } from "../components/reader/ContinuousScrolled";
import WithSlider from "../components/reader/WithSlider";
import VersionLayout from "../components/Version/Layout";
import DrawerRoot from "../components/Drawer/DrawerRoot";
import FollowLayout from "../components/Follow/FollowLayout";
import InstagramLayout from "../components/Instagram/Layout";

export const routes = [
  {
    title: "Version",
    description: "Meta Version",
    route: "Version",
    component: VersionLayout,
  },
  {
    title: "Follow",
    description: "Follow RSS Reader",
    route: "Follow",
    component: FollowLayout,
  },
  {
    title: "instagram",
    description: "Instagram mutation",
    route: "Instagram",
    initScreen: "HOME",
    component: InstagramLayout,
  },
  {
    title: "Drawer",
    description: "Drawer Navigation",
    route: "Drawer",
    component: DrawerRoot,
  },
  {
    title: "Basic",
    description: "The minimum to work.",
    route: "Basic",
    component: Basic,
  },
  {
    title: "Formats",
    description:
      "Loading a book of different formats. (opf, epub, base64 and internal)",
    route: "Formats",
    component: Formats,
  },
  {
    title: "Custom Themes",
    description: "Loading a book with custom themes.",
    route: "CustomThemes",
    component: CustomThemes,
  },
  {
    title: "Initial Location",
    description: "Open book in specific location.",
    route: "InitialLocation",
    component: InitialLocation,
  },
  {
    title: "Search",
    description: "Search terms in the book.",
    route: "Search",
    component: Search,
  },
  {
    title: "Open External Link",
    description: "Handle opening external links in epub",
    route: "OpenExternalLink",
    component: OpenExternalLink,
  },
  {
    title: "Annotations",
    description: "Some use cases for text markup",
    route: "Annotations",
    component: Annotations,
  },
  {
    title: "Bookmarks",
    description: "Using bookmarks in the book",
    route: "Bookmarks",
    component: Bookmarks,
  },
  {
    title: "Table of Contents",
    description: "Ordered list of links into the content",
    route: "TableOfContents",
    component: TableOfContents,
  },
  {
    title: "Javascript Injection",
    description: "Inject a script into the open ebook instance",
    route: "JavascriptInjection",
    component: JavascriptInjection,
  },
  {
    title: "Spreads",
    description:
      "Display an ebook two pages at a time. Sections of the ebook are displayed separately so if a section has a single page or an odd number of pages it will display with a blank page on the right. Use Tablet to see this works.",
    route: "Spreads",
    component: Spreads,
  },
  {
    title: "Scrolled Doc",
    description:
      'Displays each "section" or "chapter" of the ebook in its entirety as a single page of variable height that you can scroll up and down.',
    route: "ScrolledDoc",
    component: ScrolledDoc,
  },
  {
    title: "Continuous Spreads",
    description:
      "The example is the same as Spreads above except that the entire document is rendered at once without breaks so if a section has one page, the next section is shown beginning on the right-hand-page rather than a blank page.",
    route: "ContinuousSpreads",
    component: ContinuousSpreads,
  },
  {
    title: "Continuous Scrolled",
    description:
      "The example is the same as Scrolled Doc except the entire ebook is rendered in the browser at once so there are no navigation links above and below each chapter. This version may take longer to render and uses more memory since the whole ebook is loaded into memory. This version has no links to navigate or jump between chapters.",
    route: "ContinuousScrolled",
    component: ContinuousScrolled,
  },
  {
    title: "With Slider",
    description: "Navigate between locations with slider",
    route: "WithSlider",
    component: WithSlider,
  },
  {
    title: "Full Example",
    description: "A complete reader using library resources",
    route: "FullExample",
    component: FullExample,
  },
];
