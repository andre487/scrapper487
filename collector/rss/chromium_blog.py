import feedparser
import logging

from util import date


feed_url = 'http://blog.chromium.org/atom.xml'

log = logging.getLogger('app')


def parse():
    feed = feedparser.parse(feed_url)
    data = []

    for entry in feed['entries']:
        pb_date = date.parse(entry['published'])

        author_name = ''
        author_link = ''

        if 'authors' in entry and len(entry['authors']):
            author = entry['authors'][0]

            author_name = author['name']
            author_link = author['href']

        data.append({
            'title': entry['title'],
            'description': entry['summary'],
            'picture': entry['gd_image']['src'],
            'link': entry['link'],
            'published': pb_date.strftime('%Y-%m-%dT%H:%M:00'),

            'source_name': 'ChromiumBlog',
            'source_title': feed['feed']['title'],
            'source_link': feed['feed']['link'],

            'author_name': author_name,
            'author_link': author_link,

            'tags': 'tech,web,browsers,chromium',
        })

    log.info('Chromium Blog: got %d documents', len(data))

    return data


if __name__ == '__main__':
    print parse()
