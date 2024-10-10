<template>
  <div
    class="flex w-full flex-col rounded bg-additional-50 p-6 shadow-md outline outline-1 outline-offset-0 outline-neutral-200 hover:shadow-lg xs:p-4 lg:px-5 lg:pb-3.5 lg:pt-5"
  >
    <div class="relative flex flex-col items-center justify-center pb-[87%]">
      <div class="absolute top-0 size-full rounded">
        <router-link class="catalog-menu-child-link" :to="category.slug ?? '#'">
          <VcImage
            :src="category.imgSrc"
            :alt="category.name"
            size-suffix="md"
            class="size-full rounded object-cover object-center"
            lazy
          />
        </router-link>
      </div>
    </div>
    <div class="flex grow flex-col pt-3 lg:pt-2.5">
      <VcTooltip>
        <template #trigger>
          <router-link
            :to="category.slug ?? '#'"
            class="my-px line-clamp-2 h-11 cursor-pointer text-lg font-extrabold text-[--link-color] hover:text-[--link-hover-color] lg:h-9 lg:text-sm"
            @click="$emit('linkClick', $event)"
          >
            {{ category.name }}
          </router-link>
        </template>
        <template #content>
          {{ category.name }}
        </template>
      </VcTooltip>
      <div class="text-base text-[--color-neutral-600]">
        <VcMarkdownRender :src="description" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Category } from "@/core/api/graphql/types";

interface IProps {
  category: Category;
}
defineEmits<{ (eventName: "linkClick", globalEvent: MouseEvent): void }>();

const props = defineProps<IProps>();

const description = computed<string>(() => props.category.description?.content ?? "");
</script>
