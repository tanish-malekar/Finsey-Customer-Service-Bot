from elasticsearch import helpers
from elasticsearch import Elasticsearch
from elasticsearch import Elasticsearch, helpers
from datetime import datetime
from time import sleep
import csv
import json
import sys
import os




es = Elasticsearch(
    cloud_id="HackRX:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDA5OTMzNjQ5ODJkMDQyOThhY2IwZmY5ZmNjYTMwMGRmJGRiYWViNjhhOTlkNDRlY2FhOTU1NzE1ZTUxNGU3ZDM0",
    http_auth=("elastic", "IT46F8n20fj9lITRuK6EqRNE")
)
# use the elasticsearc
# h client's helpers class for _bulk API
#es = Elasticsearch("h
# 2ttps://localhost:9200")
# print(es.ping())


#es.indices.delete(index='some36')

body1 = {  # specify the mappings for elastic search

    "settings": {
        "analysis": {
            "filter": {

                "english_stemmere": {
                    "type":       "stemmer",
                    "language":   "english"
                },

                "my_stop": {
                    "type":       "stop",
                    "stopwords":  "_english_"
                }




            },

            "analyzer": {
                "mycustomized_lowercase_stemmed": {
                    "tokenizer": "standard",
                    "filter": ["lowercase", "my_stop", "english_stemmere"

                               ]

                },
                "autocomplete_search": {
                    "tokenizer": "standard",
                    "filter": ["lowercase", "my_stop", "english_stemmere"]

                }
            }

        }},







    'mappings':
    {

        "numeric_detection": "true",
        "date_detection": "true",

        "dynamic_templates": [
            {
                "named_analyzers": {  # for automatically picking up analyzer for any field with text
                    "match_mapping_type": "string",
                    "match": "*",
                    "mapping": {
                        "type": "text",
                        "analyzer": "mycustomized_lowercase_stemmed",
                        "search_analyzer": "autocomplete_search"
                    }
                }
            }],

        'properties': {



            "text": {
                "type": "text",
                "analyzer": "mycustomized_lowercase_stemmed",
                "search_analyzer": "autocomplete_search",
                # "search_analyzer": "standard",
                "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                }
            },





        }
    }
}


response = es.indices.create(index='some36', ignore=400, body=body1)
v = es.indices.exists(index="some36")
print(v)


# bulk indexing

actions = [
  #WHAT IS CAR INSURANCE? 
    {
        "_index": "some36",
        "_id": "1",
        "_source": {
            "text": "Car Insurance is a contract you and your insurer enter into, to protect you from financial damages caused by unforeseeable circumstances like accidents, theft, and even natural calamities"
        }
    },
    #WHY SHOULD YOU BUY A CAR INSURANCE POLICY? 
    {
        "_index": "some36",
        "_id": "2",
        "_source": {
            "text": "The documents required are Details about your vehicle including registration number, A valid driver’s licence, Completed claim form, Bank details, Tax receipts and Filled insurance forms"
        }
    },
    #Why do I need to insure my vehicle? 
    {
        "_index": "some36",
        "_id": "3",
        "_source": {
            "text": "The Motor Vehicle Act of 1988 mandates that every vehicle shall have an insurance policy. An insurance policy provides a blanket cover protecting you from losses, accidental, theft, or otherwise. Additionally, car insurance also compensates for damages to co-passengers and other vehicles. "
        }
    },
    #What are the types of car insurance in India? 
    {
        "_index": "some36",
        "_id": "4",
        "_source": {
            "text": "Out of the two types of car insurance, Third-Party and Comprehensive Insurance, the latter covers damages to you, your property, along with damages to the third party . In contrast, the third-party insurance body injury or death and property damage of the other person."
        }
    }

]
response = helpers.bulk(es, actions)
print("helpers.bulk() RESPONSE:", response)
print("helpers.bulk() RESPONSE:", json.dumps(response, indent=4))
print("INDEXING COMPLETE")


# #es = Elasticsearch("https://localhost:9200")
# print("SEARCHING:SEARCH RESULTS")

query = "What is car insurance"

rest = es.search(index="some36", body={
                "query": {"match": {'text': query}}})  # search query

soln = rest['hits']['hits'][0]['_source']['text']
print(soln)