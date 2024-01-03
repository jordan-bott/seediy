FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
# Modify these instructions to do that
COPY requirements.txt requirements.txt
COPY main.py main.py

# Copy all of the subdirectories in your service's directory
# Modify these instructions to do that
COPY queries queries
COPY routers routers

RUN python -m pip install -r requirements.txt


# If you're using a relational database and want migrations
# to be run automatically, delete the previous CMD line and
# uncomment the following COPY and CMD lines
COPY migrations migrations
# # !! PORT env var needs to match with exposed port in caprover dashboard

CMD uvicorn app:app --host 0.0.0.0 --port $PORT
