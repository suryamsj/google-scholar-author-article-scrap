<script lang="ts">
	import type { PageData } from "./$types";
  import * as XLSX from 'xlsx';

  let { data }: { data: PageData } = $props();
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

  let id = $state("");

  let {articles} = $derived(data);

  let params = $derived($page.url.searchParams.get("id"));

  function exportToExcel(article: any[]){
    const worksheet = XLSX.utils.json_to_sheet(article);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Penelitian");
    XLSX.writeFile(workbook, "penelitian_data.xlsx");
  }
</script>

<svelte:head>
  <title>Google Scholar Author Scrap</title>
</svelte:head>

<main class="flex-shrink-0">
  <section class="py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-12 col-12">
          <div class="col-lg-12 col-md-12 col-12">
            <div class="card shadow-sm">
              <div class="card-header">
                Data Artikel
                {#if params}
                <button class="btn btn-primary float-end" onclick={() => exportToExcel(articles)}>Download Excel</button>
              {/if}
              </div>
              <div class="card-body">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Judul</th>
                      <th>Tahun</th>
                      <th>Link Publikasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {#each articles as item,i}
                       <tr>
                        <td>{i + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.year}</td>
                        <td>
                          <a href={item.url}>{item.title}</a>
                        </td>
                       </tr>
                    {:else}
                       <tr>
                        <td colspan="4" class="text-center">Data artikel tidak di temukan</td>
                       </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-12 col-12">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-12">
              <div class="card shadow-sm">
                <div class="card-header">
                  Cari Author
                </div>
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col-lg-6 col-md-12 col-12">
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control w-100" id="id" placeholder="User ID" bind:value={id} required>
                        <label for="id">User ID</label>
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-12 col-12">
                      <div class="mb-3">
                        <button class="btn btn-primary w-100" type="submit" onclick={() => goto(`/?id=${id}`)}>Kirim</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>