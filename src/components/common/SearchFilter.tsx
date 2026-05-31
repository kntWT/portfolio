import { Article } from "@/@types/article";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchFilterUIProps {
  shouldFilterByGrade: boolean;
  query: string;
  tempQuery: string;
  setTempQuery: (q: string) => void;
  selectedTags: string[];
  selectedStacks: string[];
  gradeOrYearTags: string[];
  otherTags: string[];
  availableStacks: string[];
  isExpanded: boolean;
  setIsExpanded: (exp: boolean) => void;
  onTagToggle: (tag: string) => void;
  onStackToggle: (stack: string) => void;
  onReset: () => void;
  onClearQuery: () => void;
}

const SearchFilterUI = ({
  shouldFilterByGrade,
  query,
  tempQuery,
  setTempQuery,
  selectedTags,
  selectedStacks,
  gradeOrYearTags,
  otherTags,
  availableStacks,
  isExpanded,
  setIsExpanded,
  onTagToggle,
  onStackToggle,
  onReset,
  onClearQuery,
}: SearchFilterUIProps) => {
  const hasActiveFilter =
    query.trim() !== "" || selectedTags.length > 0 || selectedStacks.length > 0;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto 2.5rem auto",
        padding: "0 1rem",
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <TextField
          fullWidth
          placeholder="キーワードで検索"
          value={tempQuery}
          onChange={(e) => setTempQuery(e.target.value)}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              backgroundColor: "background.paper",
              transition: "box-shadow 0.2s, border-color 0.2s",
              "&:hover": {
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              },
              "&.Mui-focused": {
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
            endAdornment: tempQuery ? (
              <InputAdornment position="end">
                <IconButton
                  onClick={onClearQuery}
                  onMouseDown={(e) => e.preventDefault()}
                  size="small"
                  edge="end"
                  aria-label="検索ワードをクリア"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />

        <Box
          sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" } }}
        >
          <Button
            variant={isExpanded || hasActiveFilter ? "contained" : "outlined"}
            color="secondary"
            onClick={() => setIsExpanded(!isExpanded)}
            startIcon={<FilterListIcon />}
            endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{
              flexGrow: { xs: 1, sm: 0 },
              borderRadius: "20px",
              textTransform: "none",
              px: 3,
              py: 1,
              whiteSpace: "nowrap",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            {(selectedTags.length > 0 || selectedStacks.length > 0) &&
              ` (${selectedTags.length + selectedStacks.length})`}
          </Button>
        </Box>
      </Box>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            mt: 1,
            p: 2.5,
            borderRadius: "16px",
            backgroundColor: "action.hover",
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          {gradeOrYearTags.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 1,
                  fontWeight: 700,
                  color: "text.secondary",
                }}
              >
                {shouldFilterByGrade ? "学年" : "西暦"}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {gradeOrYearTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <Chip
                      key={tag}
                      label={
                        shouldFilterByGrade
                          ? `#${tag}`
                          : `#${tag.replace(/年$/, "")}年`
                      }
                      onClick={() => onTagToggle(tag)}
                      color={isSelected ? "secondary" : "default"}
                      variant={isSelected ? "filled" : "outlined"}
                      sx={{
                        borderRadius: "8px",
                        fontWeight: isSelected ? 600 : 500,
                        cursor: "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-1px)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}

          {otherTags.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 1,
                  fontWeight: 700,
                  color: "text.secondary",
                }}
              >
                属性 / カテゴリ
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {otherTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      onClick={() => onTagToggle(tag)}
                      color={isSelected ? "secondary" : "default"}
                      variant={isSelected ? "filled" : "outlined"}
                      sx={{
                        borderRadius: "8px",
                        fontWeight: isSelected ? 600 : 500,
                        cursor: "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-1px)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}

          {availableStacks.length > 0 && (
            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 1,
                  fontWeight: 700,
                  color: "text.secondary",
                }}
              >
                技術スタック
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {availableStacks.map((stack) => {
                  const isSelected = selectedStacks.includes(stack);
                  return (
                    <Chip
                      key={stack}
                      label={stack}
                      onClick={() => onStackToggle(stack)}
                      color={isSelected ? "primary" : "default"}
                      variant={isSelected ? "filled" : "outlined"}
                      sx={{
                        borderRadius: "8px",
                        fontWeight: isSelected ? 600 : 500,
                        cursor: "pointer",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-1px)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}

          {/* 一括クリアボタンをCollapse内の最下部に配置 */}
          {hasActiveFilter && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={onReset}
                startIcon={<RestartAltIcon />}
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  px: 3,
                }}
              >
                検索条件をクリア
              </Button>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

/**
 * URLクエリパラメータの同期とフィルタリングを行うカスタムフック
 */
export const useSearchFilter = (
  articles: Article[],
  options?: { shouldFilterByGrade?: boolean },
) => {
  const shouldFilterByGrade = options?.shouldFilterByGrade || false;
  const [searchParams, setSearchParams] = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const isGradeTag = (t: string) => /^[BMD]\d$/.test(t);
  const isYearTag = (t: string) => /^\d{4}年?$/.test(t);

  // タグを「学年/西暦」と「その他」に分類
  const { gradeOrYearTags, otherTags, validTags } = useMemo(() => {
    const allUniqueTags = Array.from(
      new Set(articles.flatMap((art) => art.tags)),
    );

    const gradeOrYear: string[] = [];
    const other: string[] = [];

    allUniqueTags.forEach((tag) => {
      if (shouldFilterByGrade) {
        if (isGradeTag(tag)) {
          gradeOrYear.push(tag);
        } else if (!isYearTag(tag)) {
          other.push(tag);
        }
      } else {
        if (isYearTag(tag)) {
          gradeOrYear.push(`${tag}`);
        } else if (!isGradeTag(tag)) {
          other.push(tag);
        }
      }
    });

    gradeOrYear.sort();
    other.sort();

    return {
      gradeOrYearTags: gradeOrYear,
      otherTags: other,
      validTags: [...gradeOrYear, ...other],
    };
  }, [articles, shouldFilterByGrade]);

  const availableStacks = useMemo(() => {
    return Array.from(
      new Set(articles.flatMap((art) => art.stacks || [])),
    ).sort();
  }, [articles]);

  const query = searchParams.get("q") || "";

  const selectedTags = useMemo(() => {
    const tagsParam = searchParams.get("tags");
    if (!tagsParam) return [];
    return tagsParam.split(",").filter((tag) => validTags.includes(tag));
  }, [searchParams, validTags]);

  const selectedStacks = useMemo(() => {
    const stacksParam = searchParams.get("stacks");
    if (!stacksParam) return [];
    return stacksParam
      .split(",")
      .filter((stack) => availableStacks.includes(stack));
  }, [searchParams, availableStacks]);

  const [tempQuery, setTempQuery] = useState(query);

  useEffect(() => {
    setTempQuery(query);
  }, [query]);

  const updateParams = (
    newQuery: string,
    newTags: string[],
    newStacks: string[],
  ) => {
    const params: Record<string, string> = {};
    if (newQuery.trim()) {
      params.q = newQuery;
    }
    if (newTags.length > 0) {
      params.tags = newTags.join(",");
    }
    if (newStacks.length > 0) {
      params.stacks = newStacks.join(",");
    }
    setSearchParams(params, { replace: true });
  };

  useEffect(() => {
    if (validTags.length === 0 || availableStacks.length === 0) return;

    const tagsParam = searchParams.get("tags");
    const stacksParam = searchParams.get("stacks");

    let isChanged = false;
    let cleanedTags: string[] = [];
    let cleanedStacks: string[] = [];

    if (tagsParam) {
      const parsed = tagsParam.split(",");
      cleanedTags = parsed.filter((tag) => validTags.includes(tag));
      if (parsed.length !== cleanedTags.length) isChanged = true;
    }

    if (stacksParam) {
      const parsed = stacksParam.split(",");
      cleanedStacks = parsed.filter((stack) => availableStacks.includes(stack));
      if (parsed.length !== cleanedStacks.length) isChanged = true;
    }

    if (isChanged) {
      updateParams(query, cleanedTags, cleanedStacks);
    }
  }, [searchParams, validTags, availableStacks, query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (tempQuery !== query) {
        updateParams(tempQuery, selectedTags, selectedStacks);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [tempQuery, query, selectedTags, selectedStacks]);

  useEffect(() => {
    if (selectedTags.length > 0 || selectedStacks.length > 0) {
      setIsExpanded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags.length, selectedStacks.length]);

  const toggleTag = (tag: string, currentTags: string[]) => {
    return currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
  };

  const handleTagToggle = (tag: string) => {
    const nextTags = toggleTag(tag, selectedTags);
    updateParams(query, nextTags, selectedStacks);
  };

  const handleStackToggle = (stack: string) => {
    const nextStacks = selectedStacks.includes(stack)
      ? selectedStacks.filter((s) => s !== stack)
      : [...selectedStacks, stack];
    updateParams(query, selectedTags, nextStacks);
  };

  const handleReset = () => {
    setSearchParams({}, { replace: true });
  };

  const handleClearQuery = () => {
    setTempQuery("");
    updateParams("", selectedTags, selectedStacks);
  };

  const handleCardTagClick = (tag: string) => {
    const nextTags = toggleTag(tag, selectedTags);
    updateParams(query, nextTags, selectedStacks);
  };

  const handleCardStackClick = (stack: string) => {
    const nextStacks = selectedStacks.includes(stack)
      ? selectedStacks.filter((s) => s !== stack)
      : [...selectedStacks, stack];
    updateParams(query, selectedTags, nextStacks);
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      // 1. キーワード部分一致 (スペース区切りによる複数ワードAND検索)
      const words = query
        .trim()
        .toLowerCase()
        .split(/[\s　]+/)
        .filter(Boolean);
      const matchQuery =
        words.length === 0 ||
        words.every((word) => {
          const titleMatch = art.title.toLowerCase().includes(word);
          const descMatch = art.description
            ? art.description.toLowerCase().includes(word)
            : false;
          const stackMatch = art.stacks
            ? art.stacks.some((s) => s.toLowerCase().includes(word))
            : false;
          return titleMatch || descMatch || stackMatch;
        });

      // 2. タグ絞り込み (学年/西暦グループ内OR、その他属性グループ内OR)
      const selectedGradesOrYears = selectedTags.filter(
        shouldFilterByGrade ? isGradeTag : isYearTag,
      );
      const selectedOthers = selectedTags.filter(
        shouldFilterByGrade ? (t) => !isGradeTag(t) : (t) => !isYearTag(t),
      );

      const matchGradesOrYears =
        selectedGradesOrYears.length === 0 ||
        selectedGradesOrYears.some((tag) => art.tags.map(String).includes(tag));

      const matchOthers =
        selectedOthers.length === 0 ||
        selectedOthers.some((tag) => art.tags.includes(tag));

      const matchTags = matchGradesOrYears && matchOthers;

      // 3. 技術スタック絞り込み (技術スタックグループ内OR検索)
      const matchStacks =
        selectedStacks.length === 0 ||
        selectedStacks.some((stack) =>
          art.stacks ? art.stacks.includes(stack) : false,
        );

      return matchQuery && matchTags && matchStacks;
    });
  }, [articles, query, selectedTags, selectedStacks]);

  const SearchFilterUIElement = (
    <SearchFilterUI
      shouldFilterByGrade={shouldFilterByGrade}
      query={query}
      tempQuery={tempQuery}
      setTempQuery={setTempQuery}
      selectedTags={selectedTags}
      selectedStacks={selectedStacks}
      gradeOrYearTags={gradeOrYearTags}
      otherTags={otherTags}
      availableStacks={availableStacks}
      isExpanded={isExpanded}
      setIsExpanded={setIsExpanded}
      onTagToggle={handleTagToggle}
      onStackToggle={handleStackToggle}
      onReset={handleReset}
      onClearQuery={handleClearQuery}
    />
  );

  return {
    filteredArticles,
    SearchFilter: SearchFilterUIElement,
    handleCardTagClick,
    handleCardStackClick,
    handleReset,
  };
};

export default useSearchFilter;
