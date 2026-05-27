import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import sm from './sm.json'

export const endpoint = sm.apiEndpoint
export const repositoryName = prismic.getRepositoryName(endpoint)

export const routes = [
  { type: 'home', path: '/' },
  { type: 'page', path: '/:uid' },
  { type: 'project', path: '/project/:uid' },
  { type: 'category', path: '/category/:uid' },
]

export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    routes,
    ...config,
  })

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}