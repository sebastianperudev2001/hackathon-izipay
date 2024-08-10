import json

def lambda_handler(event, context):
    # Extract input parameters from the event
    input_param1 = event.get('param1')
    input_param2 = event.get('param2')

    # Perform some processing
    result = input_param1 + input_param2

    # Prepare the response
    response = {
        'statusCode': 200,
        'body': json.dumps({'result': result})
    }

    return response