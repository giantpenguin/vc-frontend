<template>
  <div class="flex items-stretch lg:gap-6">
    <div ref="contentElement" class="grow">
      <div class="flex">
        <VcTypography tag="h2">
          <!-- title -->
          <span>{{ $t("blocks.featuredCategories.title") }}</span>
        </VcTypography>
      </div>
      <div class="mt-3"></div>
      <div class="null:grid-cols-1 grid gap-5 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        <component
          :is="CategoryCard"
          v-for="cat in featuredCategories"
          :key="cat.id"
          :category="cat"
          @link-click="$emit('categoryLinkClick', cat, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
// import { useI18n } from "vue-i18n";
import { useCategories } from "../composables";
import CategoryCard from "./category/category-card.vue";
import type { Category } from "@/core/api/graphql/types";

defineEmits<IEmits>();

// const { t } = useI18n();
const { featuredCategories, fetchFeaturedCategories } = useCategories();

interface IEmits {
  (eventName: "categoryLinkClick", category: Category, globalEvent: MouseEvent): void;
}

onMounted(async () => {
  if (!featuredCategories.value.length) {
    await fetchFeaturedCategories();
  }
});
</script>
