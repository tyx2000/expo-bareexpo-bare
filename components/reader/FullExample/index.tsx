import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  ReaderProvider,
  Reader,
  useReader,
  Themes,
  Annotation,
} from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MAX_FONT_SIZE, MIN_FONT_SIZE, availableFonts, themes } from "./utils";
import { BookmarksList } from "../Bookmarks/BookmarksList";
import { SearchList } from "../Search/SearchList";
import { TableOfContents } from "../TableOfContents/TableOfContents";
import { COLORS } from "../Annotations/AnnotationForm";
import { AnnotationsList } from "../Annotations/AnnotationList";

function Component() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const {
    theme,
    annotations,
    changeFontSize,
    changeFontFamily,
    changeTheme,
    goToLocation,
    addAnnotation,
    removeAnnotation,
  } = useReader();

  const bookmarksListRef = React.useRef<BottomSheetModal>(null);
  const searchListRef = React.useRef<BottomSheetModal>(null);
  const tableOfContentsRef = React.useRef<BottomSheetModal>(null);
  const annotationsListRef = React.useRef<BottomSheetModal>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(14);
  const [currentFontFamily, setCurrentFontFamily] = useState(availableFonts[0]);
  const [tempMark, setTempMark] = React.useState<Annotation | null>(null);
  const [selection, setSelection] = React.useState<{
    cfiRange: string;
    text: string;
  } | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = React.useState<
    Annotation | undefined
  >(undefined);

  const increaseFontSize = () => {
    if (currentFontSize < MAX_FONT_SIZE) {
      setCurrentFontSize(currentFontSize + 1);
      changeFontSize(`${currentFontSize + 1}px`);
    }
  };

  const decreaseFontSize = () => {
    if (currentFontSize > MIN_FONT_SIZE) {
      setCurrentFontSize(currentFontSize - 1);
      changeFontSize(`${currentFontSize - 1}px`);
    }
  };

  const switchTheme = () => {
    const index = Object.values(themes).indexOf(theme);
    const nextTheme =
      Object.values(themes)[(index + 1) % Object.values(themes).length];

    changeTheme(nextTheme);
  };

  const switchFontFamily = () => {
    const index = availableFonts.indexOf(currentFontFamily);
    const nextFontFamily = availableFonts[(index + 1) % availableFonts.length];

    setCurrentFontFamily(nextFontFamily);
    changeFontFamily(nextFontFamily);
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: theme.body.background,
      }}
    >
      {!isFullScreen && (
        <Header
          currentFontSize={currentFontSize}
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
          switchTheme={switchTheme}
          switchFontFamily={switchFontFamily}
          onPressSearch={() => searchListRef.current?.present()}
          onOpenBookmarksList={() => bookmarksListRef.current?.present()}
          onOpenTableOfContents={() => tableOfContentsRef.current?.present()}
          onOpenAnnotationsList={() => annotationsListRef.current?.present()}
        />
      )}

      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        width={width}
        height={!isFullScreen ? height * 0.75 : height}
        fileSystem={useFileSystem}
        defaultTheme={Themes.DARK}
        waitForLocationsReady
        initialLocation="introduction_001.xhtml"
        initialAnnotations={[
          // Chapter 1
          {
            cfiRange: "epubcfi(/6/10!/4/2/4,/1:0,/1:319)",
            data: {},
            sectionIndex: 4,
            styles: { color: "#23CE6B" },
            cfiRangeText:
              "The pale Usher—threadbare in coat, heart, body, and brain; I see him now. He was ever dusting his old lexicons and grammars, with a queer handkerchief, mockingly embellished with all the gay flags of all the known nations of the world. He loved to dust his old grammars; it somehow mildly reminded him of his mortality.",
            type: "highlight",
          },
          // Chapter 5
          {
            cfiRange: "epubcfi(/6/22!/4/2/4,/1:80,/1:88)",
            data: {},
            sectionIndex: 3,
            styles: { color: "#CBA135" },
            cfiRangeText: "landlord",
            type: "highlight",
          },
        ]}
        onAddAnnotation={(annotation) => {
          if (annotation.type === "highlight" && annotation.data?.isTemp) {
            setTempMark(annotation);
          }
        }}
        onPressAnnotation={(annotation) => {
          setSelectedAnnotation(annotation);
          annotationsListRef.current?.present();
        }}
        menuItems={[
          {
            label: "🟡",
            action: (cfiRange) => {
              addAnnotation("highlight", cfiRange, undefined, {
                color: COLORS[2],
              });
              return true;
            },
          },
          {
            label: "🔴",
            action: (cfiRange) => {
              addAnnotation("highlight", cfiRange, undefined, {
                color: COLORS[0],
              });
              return true;
            },
          },
          {
            label: "🟢",
            action: (cfiRange) => {
              addAnnotation("highlight", cfiRange, undefined, {
                color: COLORS[3],
              });
              return true;
            },
          },
          {
            label: "Add Note",
            action: (cfiRange, text) => {
              setSelection({ cfiRange, text });
              addAnnotation("highlight", cfiRange, { isTemp: true });
              annotationsListRef.current?.present();
              return true;
            },
          },
        ]}
        onDoublePress={() => setIsFullScreen((oldState) => !oldState)}
      />

      <BookmarksList
        ref={bookmarksListRef}
        onClose={() => bookmarksListRef.current?.dismiss()}
      />

      <SearchList
        ref={searchListRef}
        onClose={() => searchListRef.current?.dismiss()}
      />

      <TableOfContents
        ref={tableOfContentsRef}
        onClose={() => tableOfContentsRef.current?.dismiss()}
        onPressSection={(selectedSection) => {
          goToLocation(selectedSection.href.split("/")[1]);
          tableOfContentsRef.current?.dismiss();
        }}
      />

      <AnnotationsList
        ref={annotationsListRef}
        selection={selection}
        selectedAnnotation={selectedAnnotation}
        annotations={annotations}
        onClose={() => {
          setTempMark(null);
          setSelection(null);
          setSelectedAnnotation(undefined);
          if (tempMark) removeAnnotation(tempMark);
          annotationsListRef.current?.dismiss();
        }}
      />

      {!isFullScreen && <Footer />}
    </GestureHandlerRootView>
  );
}

export function FullExample() {
  return (
    <ReaderProvider>
      <Component />
    </ReaderProvider>
  );
}
