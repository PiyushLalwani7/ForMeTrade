from decimal import Decimal
from datetime import datetime

import json

def serialize_dict(data):
    return json.dumps(data, default= default)

def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    elif isinstance(obj, datetime):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)