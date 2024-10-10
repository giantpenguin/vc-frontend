import { computed, readonly, ref, shallowRef } from "vue";
import { getCategories } from "@/core/api/graphql";
import { globals } from "@/core/globals";
import { Logger, getFilterExpressionForCategorySubtree } from "@/core/utilities";
import type { Category } from "@/core/api/graphql/types";

export function useCategories() {
  const loading = ref(false);
  const refFeaturedCats = shallowRef<Category[]>([]);

  async function fetchFeaturedCategories() {
    loading.value = true;
    const { catalogId } = globals;
    try {
      const categoriesFilter = [
        "status:visible",
        "ShowOnHomePage:true",
        getFilterExpressionForCategorySubtree({ catalogId }),
      ]
        .filter(Boolean)
        .join(" ");

      refFeaturedCats.value = await getCategories({ filter: categoriesFilter });
    } catch (e) {
      Logger.error(`${useCategories.name}.${fetchFeaturedCategories.name}`, e);
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    fetchFeaturedCategories,
    loading: readonly(loading),
    featuredCategories: computed(() => refFeaturedCats.value),
    // relatedCategories: computed(() => refRelatedCats.value),
  };
}
