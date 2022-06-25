classes = ["Hood","front bumper", "rear bumper","door","glass car","headlight","tail light"]

from icrawler.builtin import GoogleImageCrawler
for i in classes:
    google_Crawler = GoogleImageCrawler(storage = {'root_dir': './data/'+str(i)})
    google_Crawler.crawl(keyword = "car Damaged "+i, max_num = 100)