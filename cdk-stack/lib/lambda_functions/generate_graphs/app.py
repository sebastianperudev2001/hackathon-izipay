import json

import boto3
from langchain_aws import ChatBedrock
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain.output_parsers import PydanticOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field
from typing import List



class Dataset(BaseModel):
    label: str = Field(..., description="The label for the dataset.")
    data: List[int] = Field(..., description="Numerical values representing the data points.")
    backgroundColor: str = Field(..., description="Background color in RGBA format.")
    borderColor: str = Field(..., description="Border color in RGBA format.")
    borderWidth: int = Field(..., description="Width of the border.")
    pointBackgroundColor: str = Field(..., description="Background color of each point.")
    pointBorderColor: str = Field(..., description="Border color of each point.")
    pointHoverBackgroundColor: str = Field(..., description="Background color when a point is hovered.")
    pointHoverBorderColor: str = Field(..., description="Border color when a point is hovered.")

class ChartData(BaseModel):
    labels: List[str] = Field(..., description="List of labels for the x-axis.")
    datasets: List[Dataset] = Field(..., description="List of datasets to be displayed on the chart.")

parser = PydanticOutputParser(pydantic_object=ChartData)


def llm_call(query):
    session = boto3.Session()
    bedrock = session.client('bedrock')
    model = ChatBedrock(model_id="anthropic.claude-3-5-sonnet-20240620-v1:0")
    template = """
        Generate a JSON object that describes the {query}. The JSON object should have two main keys: 'labels' (a list of strings) and 'datasets' (a list of datasets with detailed properties).
        Each dataset should include:
        - 'label': A string label for the dataset
        - 'data': An array of numerical values
        - 'backgroundColor': A string representing the background color in RGBA format
        - 'borderColor': A string representing the border color in RGBA format
        - 'borderWidth': An integer for the border width
        - 'pointBackgroundColor': A string for the background color of each point
        - 'pointBorderColor': A string for the border color of each point
        - 'pointHoverBackgroundColor': A string for the hover background color of each point
        - 'pointHoverBorderColor': A string for the hover border color of each point
        Only return the JSON object and do not include any additional information.
    """
    prompt = PromptTemplate(
        template=template,
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )

    chain = prompt | model | parser

    message = chain.invoke(
    {
        "query": query
    })

    return message



def lambda_handler(event, context):
    
    body = json.loads(event['body'])

    query = body['query']
    print(query)
    result = llm_call(query)
    print(result)
        
    # Creating a response
    response = {
        'labels': result.labels,
        'datasets': [dataset.dict() for dataset in result.datasets]  # Convert each Dataset to a dictionary    
    }
    
    # Returning the response
    return {
        'statusCode': 200,
        'headers': {
                        'Access-Control-Allow-Origin': '*'  # Allow CORS from any origin
                    },
        'body': json.dumps(response)
    }