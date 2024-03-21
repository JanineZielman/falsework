// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/types";
import type * as prismicClient from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

/**
 * Item in *Home → Projects*
 */
export interface HomeDocumentDataProjectsItem {
	/**
	 * Project field in *Home → Projects*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.projects[].project
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	project: prismic.ContentRelationshipField<"project">;
}

/**
 * Item in *Home → Menu*
 */
export interface HomeDocumentDataMenuItem {
	/**
	 * Link field in *Home → Menu*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.menu[].link
	 * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
	 */
	link: prismic.LinkField;
	
	/**
	 * Label field in *Home → Menu*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.menu[].label
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	label: prismic.KeyTextField;
}

type HomeDocumentDataSlicesSlice = BigTextSlice | ImageSlice | TitleTextSlice

/**
 * Content for Home documents
 */
interface HomeDocumentData {
	/**
	 * Title field in *Home*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Intro field in *Home*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.intro
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	intro: prismic.RichTextField;
	
	/**
	 * Right Column Text field in *Home*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.right_column_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	right_column_text: prismic.RichTextField;
	
	/**
	 * Projects field in *Home*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.projects[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	projects: prismic.GroupField<Simplify<HomeDocumentDataProjectsItem>>;
	
	/**
	 * Menu field in *Home*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.menu[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	menu: prismic.GroupField<Simplify<HomeDocumentDataMenuItem>>;
	
	/**
	 * Slice Zone field in *Home*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	slices: prismic.SliceZone<HomeDocumentDataSlicesSlice>;
}

/**
 * Home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;

type PageDocumentDataSlicesSlice = BigTextSlice | ImageSlice | TitleTextSlice

/**
 * Content for Page documents
 */
interface PageDocumentData {
	/**
	 * Title field in *Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Right Column Text field in *Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.right_column_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	right_column_text: prismic.RichTextField;
	
	/**
	 * Slice Zone field in *Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#slices
	 */
	slices: prismic.SliceZone<PageDocumentDataSlicesSlice>;
}

/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;

/**
 * Item in *Project → Images*
 */
export interface ProjectDocumentDataImagesItem {
	/**
	 * Image field in *Project → Images*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: project.images[].image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Content for Project documents
 */
interface ProjectDocumentData {
	/**
	 * Title field in *Project*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: project.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Images field in *Project*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: project.images[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#group
	 */
	images: prismic.GroupField<Simplify<ProjectDocumentDataImagesItem>>;
	
	/**
	 * Images Caption field in *Project*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: project.images_caption
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	images_caption: prismic.RichTextField;
}

/**
 * Project document from Prismic
 *
 * - **API ID**: `project`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ProjectDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<ProjectDocumentData>, "project", Lang>;

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
	/**
	 * Site Title field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.site_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	site_title: prismic.KeyTextField;
	
	/**
	 * Description field in *Settings*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	description: prismic.KeyTextField;
	
	/**
	 * Image field in *Settings*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: settings.image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;

export type AllDocumentTypes = HomeDocument | PageDocument | ProjectDocument | SettingsDocument;

/**
 * Primary content in *BigText → Primary*
 */
export interface BigTextSliceDefaultPrimary {
	/**
	 * Big Text field in *BigText → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: big_text.primary.big_text
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	big_text: prismic.RichTextField;
}

/**
 * Default variation for BigText Slice
 *
 * - **API ID**: `default`
 * - **Description**: BigText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BigTextSliceDefault = prismic.SharedSliceVariation<"default", Simplify<BigTextSliceDefaultPrimary>, never>;

/**
 * Slice variation for *BigText*
 */
type BigTextSliceVariation = BigTextSliceDefault

/**
 * BigText Shared Slice
 *
 * - **API ID**: `big_text`
 * - **Description**: BigText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type BigTextSlice = prismic.SharedSlice<"big_text", BigTextSliceVariation>;

/**
 * Primary content in *Image → Primary*
 */
export interface ImageSliceDefaultPrimary {
	/**
	 * Image field in *Image → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image.primary.image
	 * - **Documentation**: https://prismic.io/docs/field#image
	 */
	image: prismic.ImageField<never>;
}

/**
 * Default variation for Image Slice
 *
 * - **API ID**: `default`
 * - **Description**: Image
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ImageSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Image*
 */
type ImageSliceVariation = ImageSliceDefault

/**
 * Image Shared Slice
 *
 * - **API ID**: `image`
 * - **Description**: Image
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ImageSlice = prismic.SharedSlice<"image", ImageSliceVariation>;

/**
 * Primary content in *TitleText → Items*
 */
export interface TitleTextSliceDefaultItem {
	/**
	 * Title field in *TitleText → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: title_text.items[].title
	 * - **Documentation**: https://prismic.io/docs/field#key-text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Text field in *TitleText → Items*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: title_text.items[].text
	 * - **Documentation**: https://prismic.io/docs/field#rich-text-title
	 */
	text: prismic.RichTextField;
}

/**
 * Default variation for TitleText Slice
 *
 * - **API ID**: `default`
 * - **Description**: TitleText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TitleTextSliceDefault = prismic.SharedSliceVariation<"default", Record<string, never>, Simplify<TitleTextSliceDefaultItem>>;

/**
 * Slice variation for *TitleText*
 */
type TitleTextSliceVariation = TitleTextSliceDefault

/**
 * TitleText Shared Slice
 *
 * - **API ID**: `title_text`
 * - **Description**: TitleText
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TitleTextSlice = prismic.SharedSlice<"title_text", TitleTextSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismicClient.ClientConfig): prismicClient.Client<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			HomeDocument,
			HomeDocumentData,
			HomeDocumentDataProjectsItem,
			HomeDocumentDataMenuItem,
			HomeDocumentDataSlicesSlice,
			PageDocument,
			PageDocumentData,
			PageDocumentDataSlicesSlice,
			ProjectDocument,
			ProjectDocumentData,
			ProjectDocumentDataImagesItem,
			SettingsDocument,
			SettingsDocumentData,
			AllDocumentTypes,
			BigTextSlice,
			BigTextSliceDefaultPrimary,
			BigTextSliceVariation,
			BigTextSliceDefault,
			ImageSlice,
			ImageSliceDefaultPrimary,
			ImageSliceVariation,
			ImageSliceDefault,
			TitleTextSlice,
			TitleTextSliceDefaultItem,
			TitleTextSliceVariation,
			TitleTextSliceDefault
		}
	}
}