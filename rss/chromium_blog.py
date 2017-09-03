import feedparser

from datetime import datetime

feed_url = 'http://blog.chromium.org/atom.xml'


def parse():
    feed = feedparser.parse(feed_url)
    data = []

    for entry in feed['entries']:
        pb = entry['published_parsed']
        pb_date = datetime(year=pb.tm_year, month=pb.tm_mon, day=pb.tm_mday, hour=pb.tm_hour, minute=pb.tm_min)

        data.append({
            'title': entry['title'],
            'description': entry['summary'],
            'picture': entry['gd_image']['src'],
            'link': entry['link'],
            'tags': 'chromium',
            'published': pb_date.strftime('%Y-%m-%dT%H:%M:00'),
            'source_name': feed['feed']['title'],
            'source_link': feed['feed']['link'],
        })

    return data


if __name__ == '__main__':
    print parse()
