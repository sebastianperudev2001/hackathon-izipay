import json

import boto3
from langchain_aws import ChatBedrock
from langchain_core.prompts import  PromptTemplate


SALES_DATA = [
    {
        "sale_id": 1001,
        "date": "2024-01-15",
        "product": "Product A",
        "amount": 120.50,
        "region": "North"
    },
    {
        "sale_id": 1002,
        "date": "2024-01-16",
        "product": "Product B",
        "amount": 85.75,
        "region": "South"
    },
    {
        "sale_id": 1003,
        "date": "2024-01-17",
        "product": "Product C",
        "amount": 210.00,
        "region": "East"
    },
    {
        "sale_id": 1004,
        "date": "2024-01-18",
        "product": "Product D",
        "amount": 95.25,
        "region": "West"
    },
    {
        "sale_id": 1005,
        "date": "2024-01-19",
        "product": "Product A",
        "amount": 150.00,
        "region": "North"
    },
    {
        "sale_id": 1006,
        "date": "2024-01-20",
        "product": "Product B",
        "amount": 175.40,
        "region": "South"
    },
    {
        "sale_id": 1007,
        "date": "2024-01-21",
        "product": "Product C",
        "amount": 123.75,
        "region": "East"
    },
    {
        "sale_id": 1008,
        "date": "2024-01-22",
        "product": "Product D",
        "amount": 87.90,
        "region": "West"
    }
]

def generate_answer(query):
    session = boto3.Session()
    bedrock = session.client('bedrock')
    model = ChatBedrock(model_id="anthropic.claude-3-5-sonnet-20240620-v1:0")
    template = """
        You are a sales assistant with access to detailed sales data. Your task is to provide accurate answers based on the following sales records ${sales_data}.
        The user will send you queries and you will answer them based on the data provided. Nothing more.
        The question is "${query}"
    """
    prompt = PromptTemplate(
        template=template,
        input_variables=["query", "sales_data"],
    )

    chain = prompt | model 

    message = chain.invoke(
    {
        "query": query,
        "sales_data": SALES_DATA
    })

    return message.content


def lambda_handler(event, context):
 
    body = json.loads(event['body'])
    query = body['query']
    print(query)

    answer = generate_answer(query)
    print(answer)
    response = {
        'statusCode': 200,
         'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'result': answer})
    }

    return response

"""

What is the total sales amount for Product A?
How many sales were made in the North region?
What was the average sale amount for Product B?
Which product had the highest sales amount?
List all sales that occurred in the South region.
What was the total sales amount for January 2024?
Which sale had the highest amount and what was its sale ID?
What is the average sale amount for the East region?

"""