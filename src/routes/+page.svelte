<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { exportToExcel, handleSearch } from '$lib/utils';

	let { data }: { data: PageData } = $props();

	let id = $state('');

	let { articles } = $derived(data);
	let { author } = $derived(data);

	let params = $derived($page.url.searchParams.get('id'));
</script>

<svelte:head>
	<title>Google Scholar Author Scrap</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
			<div class="lg:col-span-4 lg:order-last order-first">
				<div class="bg-white rounded-lg shadow-sm border border-gray-200">
					<div class="px-6 py-4 border-b border-gray-200">
						<h2 class="text-lg font-medium text-gray-900">Search Google Scholar Author</h2>
					</div>
					<div class="p-6">
						<div class="space-y-4">
							<div>
								<label for="id" class="block text-sm font-medium text-gray-700"> Scholar ID </label>
								<input
									type="text"
									id="id"
									class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									placeholder="Google Scholar Author ID"
									bind:value={id}
								/>
							</div>
							<button
								onclick={() => handleSearch(id)}
								class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
							>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Main Content -->
			<div class="lg:col-span-8">
				<!-- Author Card -->
				<div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
					<div class="px-6 py-4 border-b border-gray-200">
						<h2 class="text-lg font-medium text-gray-900">Google Scholar Author</h2>
					</div>
					<div class="p-6">
						<div class="flex items-center space-x-6">
							<img
								src={author?.image ?? "/no-image.jpg"}
								alt={author?.name ?? "Not Found"}
								class="w-24 h-24 rounded-lg object-cover shadow-sm"
							/>
							<div>
								<h3 class="text-xl font-medium text-gray-900">{author?.name ?? "Not Found"}</h3>
								<p class="mt-1">{author.information ?? "Not Found"}</p>
								<p class="text-gray-500 mt-1">{author.verified ?? "Not Found"}</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Articles Card -->
				<div class="bg-white rounded-lg shadow-sm border border-gray-200">
					<div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
						<h2 class="text-lg font-medium text-gray-900">Publications</h2>
						{#if params}
							<button
								onclick={() => exportToExcel(articles)}
								class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Export to excel
							</button>
						{/if}
					</div>
					<div class="p-6">
						<div class="overflow-x-auto">
							<table class="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th
											class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>#</th
										>
										<th
											class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>Title</th
										>
										<th
											class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>Year</th
										>
										<th
											class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>Publication Link</th
										>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200">
									{#each articles as item, i}
										<tr class="hover:bg-gray-50">
											<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{i + 1}</td>
											<td class="px-6 py-4 text-sm text-gray-900">{item.title}</td>
											<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.year}</td>
											<td class="px-6 py-4 text-sm">
												<a
													href={item.url}
													class="text-blue-600 hover:text-blue-800 hover:underline"
													target="_blank"
													rel="noopener noreferrer"
												>
													See Publication
												</a>
											</td>
										</tr>
									{:else}
										<tr>
											<td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
												Publication not found
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
