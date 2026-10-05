import rss from "@astrojs/rss";
import { siteConfig } from "@/config";
import { getSortedPosts } from "@utils/content-utils";
import { url } from "@utils/url-utils";
import type { APIContext } from "astro";

// 摘要订阅：交互组件在网站中阅读，不把 MDX 原文写入订阅正文。
export async function GET(context: APIContext) {
	if (!context.site) throw new Error("请先在 astro.config.mjs 配置站点地址。");
	const blog = await getSortedPosts();
	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle || "No description",
		site: context.site,
		items: blog.map((post) => ({
			title: post.data.title,
			pubDate: post.data.published,
			description: post.data.description,
			link: url(`/posts/${post.slug}/`),
		})),
		customData: `<language>${siteConfig.lang.replace("_", "-")}</language>`,
	});
}
